export function paged(one: string): string {
  const said = `    { decisionKind: "departure", statement: ${JSON.stringify(one)} },`
  return ["export const held = {", "  decisions: [", said, "  ],", "}", ""].join("\n")
}
