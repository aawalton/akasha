import { InputError } from "@shared/errors-core/exit"
import type { SendUpdates } from "../types"

export const SEND_UPDATES: readonly SendUpdates[] = ["all", "externalOnly", "none"]

export function narrowSendUpdates(raw: string | undefined): SendUpdates | undefined {
  if (raw === undefined) return undefined
  const match = SEND_UPDATES.find((s) => s === raw)
  if (match === undefined)
    throw new InputError(`--send-updates must be one of: ${SEND_UPDATES.join(", ")} (got: ${raw})`)
  return match
}
