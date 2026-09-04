export const DECLARATION_RELATIVE_PATH =
  "akasha/seat-system/seat-relaunch-name-decide/seat-relaunch-name-decide.module.code.ts"

export const RELAUNCH_NAME_OUTCOMES = ["use-row", "bind", "need-name"] as const

export type RelaunchNameOutcome = (typeof RELAUNCH_NAME_OUTCOMES)[number]

export type RelaunchNameDecision =
  | { kind: "use-row"; name: string }
  | { kind: "bind"; name: string }
  | { kind: "need-name" }

export function decideRelaunchName(input: {
  readonly rowName: string | null
  readonly providedName: string | null
}): RelaunchNameDecision {
  const { rowName, providedName } = input
  if (rowName !== null) return { kind: "use-row", name: rowName }
  if (providedName !== null) return { kind: "bind", name: providedName }
  return { kind: "need-name" }
}
