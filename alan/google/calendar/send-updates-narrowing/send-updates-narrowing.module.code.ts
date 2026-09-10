import { InputError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { SendUpdates } from "../calendar-event-shapes/calendar-event-shapes.module.code.ts"

export const SEND_UPDATES: readonly SendUpdates[] = ["all", "externalOnly", "none"]

export function narrowSendUpdates(raw: string | undefined): SendUpdates | undefined {
  if (raw === undefined) return undefined
  const match = SEND_UPDATES.find((value) => value === raw)
  if (match === undefined)
    throw new InputError(`--send-updates must be one of: ${SEND_UPDATES.join(", ")} (got: ${raw})`)
  return match
}
