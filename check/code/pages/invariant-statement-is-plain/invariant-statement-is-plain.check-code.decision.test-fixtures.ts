export function paged(one: string): string {
  const said = `    { invariantKind: "departure", statement: ${JSON.stringify(one)} },`
  return ["export const held = {", "  invariants: [", said, "  ],", "}", ""].join("\n")
}
