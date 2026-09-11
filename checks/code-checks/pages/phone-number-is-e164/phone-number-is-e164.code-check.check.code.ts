import { refusalsOver } from "akasha/checks/code-checks/pages/phone-number-is-e164/phone-number-is-e164.code-check.decision.code.ts"
import { input, PAGES } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const phoneNumberIsE164 = input(PAGES, refusalsOver)
