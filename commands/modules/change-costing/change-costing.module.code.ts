import {
  closing,
  costOf,
  recordCost,
  type Taken,
} from "../../../checks/modules/check-cost/check-cost.module.code.ts"

export const CHANGE_PAGE = "commands/pages/change/change.command.ts"

export const APPLY_PAGE = "commands/pages/apply/apply.command.ts"

export const CHANGE = "change"

export const APPLY = "apply"

export function costRecorded(
  root: string,
  page: string,
  before: Taken,
  phase: string,
  ran: string,
  paths: number,
  refusals: number
): string | null {
  return recordCost(
    root,
    page,
    costOf(before, closing(), Bun.randomUUIDv7(), phase, ran, paths, refusals)
  )
}
