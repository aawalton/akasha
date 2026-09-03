const ROUTE = "State what this seat is with --persona, --domain, --role and --flex."

const REFUSAL =
  "this command takes no name: a seat's name SPELLS what the seat is, so it is composed from " +
  "the attributes rather than typed beside them, and a name that disagrees with them would be " +
  `two claims about one seat. ${ROUTE}`

/** The refusal a stated name earns, or null where the call states none. */
export function refuseStatedName(args: readonly string[]): string | null {
  const first = args[0]
  if (first === undefined || first === "" || first.startsWith("-")) return null
  return REFUSAL
}
