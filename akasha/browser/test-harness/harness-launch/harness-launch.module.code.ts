import { buildBrowserLaunchEnv } from "@akasha/browser-launch-env"
import { signInWithPassword } from "@akasha/supabase-auth/auth"
import { createClient } from "@supabase/supabase-js"
import { type Browser, type BrowserContext, chromium, type Page } from "playwright-core"
import {
  type ConsoleCapture,
  createConsoleCapture,
} from "../console-capture/console-capture.module.code.ts"
import { prewarmDevServer } from "../prewarm/prewarm.module.code.ts"
import { decideTargetGuard, isLocalhostTarget } from "../target-guard/target-guard.module.code.ts"
import { readWorktreeGitFacts } from "../worktree-git-facts/worktree-git-facts.module.code.ts"

export const CHROMIUM_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--disable-gpu",
]

export const CHROMIUM_LAUNCH_ENV = buildBrowserLaunchEnv(process.env)

const SIGN_IN_TIMEOUT_MS = 60_000

export async function resolveUid(creds: {
  supabaseUrl: string
  supabaseAnonKey: string
  email: string
  password: string
}): Promise<string> {
  const authClient = createClient(creds.supabaseUrl, creds.supabaseAnonKey, {
    auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: false },
  })
  const signIn = await signInWithPassword(authClient, creds.email, creds.password)
  if (signIn.error) throw new Error(`harness sign-in (supabase-js): ${signIn.error.message}`)
  if (!signIn.user) throw new Error("harness sign-in (supabase-js): no user returned")
  return signIn.user.id
}

declare const document: {
  querySelector: (selectors: string) => Record<string, unknown> | null
}

async function fillControlledInput(
  page: Page,
  selector: string,
  value: string,
  timeoutMs: number
): Promise<void> {
  await page.waitForFunction(
    (sel) => {
      const el = document.querySelector(sel)
      if (el === null) return false
      const key = Object.keys(el).find((k) => k.startsWith("__reactProps$"))
      if (key === undefined) return false
      const props = el[key]
      if (typeof props !== "object" || props === null || !("onChange" in props)) return false
      return typeof props.onChange === "function"
    },
    selector,
    { timeout: timeoutMs }
  )
  await page.locator(selector).fill(value)
  await page.waitForFunction(
    (args: { sel: string; value: string }) => {
      const el = document.querySelector(args.sel)
      if (el === null) return false
      const key = Object.keys(el).find((k) => k.startsWith("__reactProps$"))
      if (key === undefined) return false
      const props = el[key]
      if (typeof props !== "object" || props === null || !("value" in props)) return false
      return props.value === args.value
    },
    { sel: selector, value },
    { timeout: timeoutMs }
  )
}

function emitTargetGuard(targetUrl: string): undefined {
  const decision = decideTargetGuard({ targetUrl, git: readWorktreeGitFacts() })
  for (const line of decision.lines) process.stderr.write(`${line}\n`)
  return undefined
}

export async function launchAndSignIn(
  creds: { url: string; email: string; password: string },
  signInPath: string,
  signInTimeoutMs: number = SIGN_IN_TIMEOUT_MS
): Promise<{
  browser: Browser
  context: BrowserContext
  page: Page
  consoleCapture: ConsoleCapture
}> {
  emitTargetGuard(creds.url)
  const browser = await chromium.launch({
    headless: true,
    args: CHROMIUM_ARGS,
    env: CHROMIUM_LAUNCH_ENV,
  })
  try {
    const context = await browser.newContext()
    const page = await context.newPage()
    const consoleCapture = createConsoleCapture(page)
    const target = `${creds.url}${signInPath}`
    if (isLocalhostTarget(creds.url)) {
      const warm = await prewarmDevServer(page, target)
      console.log(
        `[browser prewarm] dev server ${
          warm.warmed ? "settled" : "did NOT settle within bound"
        } after ${warm.navigations} navigation(s), ${warm.elapsedMs}ms`
      )
    } else {
      await page.goto(target, { waitUntil: "load", timeout: signInTimeoutMs })
    }
    await fillControlledInput(page, "input#email", creds.email, signInTimeoutMs)
    await fillControlledInput(page, "input#password", creds.password, signInTimeoutMs)
    await page.locator('form[data-slot="auth-form"] button[type="submit"]').click()
    await page.waitForURL((url) => !url.pathname.startsWith(signInPath), {
      timeout: signInTimeoutMs,
    })
    await page.waitForLoadState("load", { timeout: signInTimeoutMs })
    if (new URL(page.url()).pathname.startsWith(signInPath)) {
      throw new Error(`harness sign-in (browser): still on ${page.url()}`)
    }
    return { browser, context, page, consoleCapture }
  } catch (err) {
    await browser.close()
    throw err
  }
}
