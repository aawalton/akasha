import {
  APP_AUDIENCE,
  APP_EXCHANGE_PATH,
} from "akasha/alan/harness/handover-rr/modules/handover-app/handover-app.module.code.ts"
import {
  challengeFor,
  HANDOVER_ISSUER,
  handoverCodeFor,
} from "akasha/alan/harness/handover-rr/modules/handover-code/handover-code.module.code.ts"
import {
  handoverLandingAt,
  type Peripheral,
  peripheralAt,
} from "akasha/alan/harness/handover-rr/modules/handover-site/handover-site.module.code.ts"
import {
  type ConsoleCapture,
  createConsoleCapture,
} from "akasha/code/browser/test-harness/modules/console-capture/console-capture.module.code.ts"
import {
  CHROMIUM_ARGS,
  CHROMIUM_LAUNCH_ENV,
} from "akasha/code/browser/test-harness/modules/harness-launch/harness-launch.module.code.ts"
import { base64Url } from "akasha/code/type/narrowing/modules/base64-url/base64-url.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { rootIn } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { secretsIn } from "akasha/page/modules/secret/page-secret.module.code.ts"
import { alan } from "akasha/person/pages/alan/alan.person.ts"
import { type Browser, type BrowserContext, chromium, type Page } from "playwright-core"

export interface SignedInSession {
  readonly browser: Browser
  readonly context: BrowserContext
  readonly page: Page
  readonly consoleCapture: ConsoleCapture
  readonly teardown: () => Promise<void>
}

type Cookie = Parameters<BrowserContext["addCookies"]>[0][number]

type SameSite = "Strict" | "Lax" | "None"

const SIGNING_KEY_PAGE =
  "infrastructure/service/akasha-service/secret/pages/alanwalton-secrets-handover-signing-key.secret.ts"

const SIGNING_KEY_ENV = "HANDOVER_SIGNING_KEY"

const VALUE_KEY = "value"

const VERIFIER_BYTES = 32

const UNAUTHORIZED = 401

const SECOND_MS = 1000

const SITE_HOST = new URL(HANDOVER_ISSUER).hostname

const EXCHANGE_AT = `${HANDOVER_ISSUER}${APP_EXCHANGE_PATH}`

const SAME_SITE: ReadonlyMap<string, SameSite> = new Map([
  ["strict", "Strict"],
  ["lax", "Lax"],
  ["none", "None"],
])

function verifierMade(): string {
  return base64Url(crypto.getRandomValues(new Uint8Array(VERIFIER_BYTES)))
}

function contributorSigningIn(): string {
  const named = slugIn(alan.contributor)
  if (named === null) {
    throw new Error(`\`${alan.contributor}\` names no contributor a handover code can carry`)
  }
  return named
}

type Minting = {
  readonly audience: string
  readonly contributor: string
  readonly challenge: string | null
}

async function codeMinted(root: string, asked: Minting): Promise<string> {
  const held = secretsIn(root, SIGNING_KEY_PAGE)
  const key = held === null ? undefined : held.get(VALUE_KEY)
  if (key === undefined || key === "") {
    throw new Error(
      `${SIGNING_KEY_PAGE} holds no \`${VALUE_KEY}\`, so no handover code can be signed`
    )
  }
  const before = optionalEnv(SIGNING_KEY_ENV)
  process.env[SIGNING_KEY_ENV] = key
  try {
    return await handoverCodeFor(asked)
  } finally {
    if (before === undefined) delete process.env[SIGNING_KEY_ENV]
    else process.env[SIGNING_KEY_ENV] = before
  }
}

function cookieIn(said: string, domain: string): Cookie | null {
  const parts = said.split(";")
  const first = parts[0]
  if (first === undefined) return null
  const at = first.indexOf("=")
  if (at <= 0) return null
  const name = first.slice(0, at).trim()
  const value = first.slice(at + 1).trim()
  if (name === "") return null
  let path = "/"
  let httpOnly = false
  let secure = false
  let sameSite: SameSite = "Lax"
  let expires: number | undefined
  for (const one of parts.slice(1)) {
    const mark = one.indexOf("=")
    const attribute = (mark === -1 ? one : one.slice(0, mark)).trim().toLowerCase()
    const held = mark === -1 ? "" : one.slice(mark + 1).trim()
    if (attribute === "path" && held !== "") path = held
    else if (attribute === "httponly") httpOnly = true
    else if (attribute === "secure") secure = true
    else if (attribute === "samesite") sameSite = SAME_SITE.get(held.toLowerCase()) ?? sameSite
    else if (attribute === "max-age") {
      const seconds = Number(held)
      if (Number.isFinite(seconds)) expires = Math.floor(Date.now() / SECOND_MS) + seconds
    } else if (attribute === "expires") {
      const when = Date.parse(held)
      if (!Number.isNaN(when)) expires = Math.floor(when / SECOND_MS)
    }
  }
  return {
    name,
    value,
    domain,
    path,
    httpOnly,
    secure,
    sameSite,
    ...(expires === undefined ? {} : { expires }),
  }
}

async function cookiesTraded(code: string, verifier: string): Promise<readonly Cookie[]> {
  const answer = await fetch(EXCHANGE_AT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ code, verifier }),
  })
  if (answer.status === UNAUTHORIZED) {
    throw new Error(
      `${EXCHANGE_AT} answered ${UNAUTHORIZED}, so no session was traded for: the site hands ` +
        "one to a contributor it holds a user for, and it holds a user only for a person whose " +
        "sign-in it has taken since that site last started"
    )
  }
  if (!answer.ok) {
    throw new Error(`${EXCHANGE_AT} answered ${answer.status}, so no session was traded for`)
  }
  const held = answer.headers.getSetCookie().flatMap((one) => {
    const cookie = cookieIn(one, SITE_HOST)
    return cookie === null ? [] : [cookie]
  })
  if (held.length === 0) {
    throw new Error(`${EXCHANGE_AT} set no cookie, so the browser would still be nobody`)
  }
  return held
}

async function cookiesLanded(peripheral: Peripheral, code: string): Promise<readonly Cookie[]> {
  const at = handoverLandingAt(peripheral, code, "/")
  const answer = await fetch(at, { redirect: "manual" })
  const host = new URL(peripheral.origin).hostname
  const held = answer.headers.getSetCookie().flatMap((one) => {
    const cookie = cookieIn(one, host)
    return cookie === null ? [] : [cookie]
  })
  if (held.length === 0) {
    throw new Error(
      `${peripheral.origin}${peripheral.landingPath} answered ${answer.status} and set no ` +
        "cookie, so the browser would still be nobody"
    )
  }
  return held
}

async function signedInCookies(origin: string): Promise<readonly Cookie[]> {
  const root = rootIn(process.env, process.cwd())
  const contributor = contributorSigningIn()
  const peripheral = peripheralAt(origin)
  if (peripheral !== null) {
    const code = await codeMinted(root, { audience: origin, contributor, challenge: null })
    return cookiesLanded(peripheral, code)
  }
  const verifier = verifierMade()
  const challenge = await challengeFor(verifier)
  const code = await codeMinted(root, { audience: APP_AUDIENCE, contributor, challenge })
  return cookiesTraded(code, verifier)
}

export type SigningIn =
  | { readonly landing: string }
  | {
      readonly origin: string
      readonly exchange: string
      readonly code: string
      readonly verifier: string
    }

export async function signingInFor(origin: string, back: string): Promise<SigningIn> {
  const root = rootIn(process.env, process.cwd())
  const contributor = contributorSigningIn()
  const peripheral = peripheralAt(origin)
  if (peripheral !== null) {
    const code = await codeMinted(root, { audience: origin, contributor, challenge: null })
    return { landing: handoverLandingAt(peripheral, code, back) }
  }
  const verifier = verifierMade()
  const challenge = await challengeFor(verifier)
  const code = await codeMinted(root, { audience: APP_AUDIENCE, contributor, challenge })
  return { origin: HANDOVER_ISSUER, exchange: EXCHANGE_AT, code, verifier }
}

export async function createSignedInSession(origin: string): Promise<SignedInSession> {
  const cookies = await signedInCookies(origin)

  const browser = await chromium.launch({
    headless: true,
    args: CHROMIUM_ARGS,
    env: CHROMIUM_LAUNCH_ENV,
  })
  try {
    const context = await browser.newContext()
    await context.addCookies([...cookies])
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
