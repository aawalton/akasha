import { CODE_PARAM } from "akasha/alan/harness/handover-rr/modules/handover-site/handover-site.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"

export const APP_AUDIENCE = "com.alanwalton.app"

export const APP_SCHEME = "alanwalton"

export const APP_LANDING_HOST = "handover"

export const APP_MINT_PATH = "/handover/app"

export const APP_EXCHANGE_PATH = "/api/handover/exchange"

export const CHALLENGE_PARAM = "challenge"

const CHALLENGE_SHAPE = /^[A-Za-z0-9_-]{43}$/

export function challengeShown(said: string | null): string | null {
  const text = textIn(said)
  if (text === null) return null
  return CHALLENGE_SHAPE.test(text) ? text : null
}

export function appMintingAt(challenge: string): string {
  const asking = new URLSearchParams()
  asking.set(CHALLENGE_PARAM, challenge)
  return `${APP_MINT_PATH}?${asking.toString()}`
}

export function appLandingAt(code: string): string {
  const carrying = new URLSearchParams()
  carrying.set(CODE_PARAM, code)
  return `${APP_SCHEME}://${APP_LANDING_HOST}?${carrying.toString()}`
}
