const ONE = 1

const A_FLAG = "`-"

const NOTHING = "``"

const ROUTE = "State what this seat is with --persona, --domain, --role and --flex."

const REFUSAL =
  "this command takes no name: a seat's name SPELLS what the seat is, so it is composed from " +
  "the attributes rather than typed beside them, and a name that disagrees with them would be " +
  `two claims about one seat. ${ROUTE}`

export function refuseStatedName(refused: readonly string[]): string | null {
  const [only] = refused
  if (only === undefined || refused.length !== ONE) return null
  if (only.startsWith(A_FLAG) || only.startsWith(NOTHING)) return null
  return REFUSAL
}
