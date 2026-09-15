import { refusalsOver } from "akasha/check/code/pages/phone-number-is-e164/phone-number-is-e164.check-code.decision.code.ts"
import { input, PAGES } from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const phoneNumberIsE164 = input(PAGES, refusalsOver)
