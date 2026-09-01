import { assertCredentialPathAllowed } from "@akasha/supabase-auth/protected-user"
import { type Browser, type BrowserContext, chromium, type Page } from "playwright-core"
import type {
  BrowserTestEnv,
  RealUserOptInEnv,
} from "../browser-test-env/browser-test-env.module.code.ts"
import {
  type ConsoleCapture,
  createConsoleCapture,
} from "../console-capture/console-capture.module.code.ts"
import {
  CHROMIUM_ARGS,
  CHROMIUM_LAUNCH_ENV,
  launchAndSignIn,
  resolveUid,
} from "../harness-launch/harness-launch.module.code.ts"

export interface ReadOnlyAnonSession {
  readonly browser: Browser
  readonly context: BrowserContext
  readonly page: Page
  readonly consoleCapture: ConsoleCapture
  readonly teardown: () => Promise<void>
}

export async function createReadOnlyAnonSession(): Promise<ReadOnlyAnonSession> {
  const browser = await chromium.launch({
    headless: true,
    args: CHROMIUM_ARGS,
    env: CHROMIUM_LAUNCH_ENV,
  })
  try {
    const context = await browser.newContext()
    const page = await context.newPage()
    const consoleCapture = createConsoleCapture(page)
    return {
      browser,
      context,
      page,
      consoleCapture,
      teardown: async (): Promise<void> => {
        await browser.close()
      },
    }
  } catch (err) {
    await browser.close()
    throw err
  }
}

export interface ReadOnlyBrowserHarness {
  readonly browser: Browser
  readonly context: BrowserContext
  readonly page: Page
  readonly consoleCapture: ConsoleCapture
  readonly userId: string
  readonly teardown: () => Promise<void>
}

export interface CreateReadOnlyRealUserHarnessOptions {
  readonly env: RealUserOptInEnv
  readonly signInPath?: string
  readonly signInTimeoutMs?: number
}

export async function createReadOnlyRealUserHarness(
  options: CreateReadOnlyRealUserHarnessOptions
): Promise<ReadOnlyBrowserHarness> {
  const { env } = options
  const signInPath = options.signInPath ?? "/sign-in"

  const userId = await resolveUid(env)
  assertCredentialPathAllowed({
    resolvedUserId: userId,
    deliberateRealUserOptIn: true,
    readOnly: true,
  })

  const { browser, context, page, consoleCapture } = await launchAndSignIn(
    env,
    signInPath,
    options.signInTimeoutMs
  )

  return {
    browser,
    context,
    page,
    consoleCapture,
    userId,
    teardown: async (): Promise<void> => {
      await browser.close()
    },
  }
}

export interface CreateReadOnlyThrowawayHarnessOptions {
  readonly env: BrowserTestEnv
  readonly signInPath?: string
  readonly signInTimeoutMs?: number
}

export async function createReadOnlyThrowawayHarness(
  options: CreateReadOnlyThrowawayHarnessOptions
): Promise<ReadOnlyBrowserHarness> {
  const { env } = options
  const signInPath = options.signInPath ?? "/sign-in"

  const userId = await resolveUid(env)
  assertCredentialPathAllowed({ resolvedUserId: userId })

  const { browser, context, page, consoleCapture } = await launchAndSignIn(
    env,
    signInPath,
    options.signInTimeoutMs
  )

  return {
    browser,
    context,
    page,
    consoleCapture,
    userId,
    teardown: async (): Promise<void> => {
      await browser.close()
    },
  }
}
