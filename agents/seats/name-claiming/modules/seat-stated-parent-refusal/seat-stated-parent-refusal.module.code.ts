export const STATED_PARENT = "--agent-id"

const AT_FLAG = `\`${STATED_PARENT}\``

const AT_EQUALS = `\`${STATED_PARENT}=`

const REFUSAL =
  "this command takes no --agent-id: the seat above the new one is the seat running it, read " +
  "from AGENT_ID in its environment. Stating it was a way to name a seat you are not, and an " +
  "id copied off a listing reads exactly like the right one while the seat it names inherits a " +
  "hand-back it has no context for. Work for a different parent by setting AGENT_ID in the " +
  "environment of the call."

export function refuseStatedParent(refused: readonly string[]): string | null {
  const stated = refused.some((one) => one.includes(AT_FLAG) || one.includes(AT_EQUALS))
  return stated ? REFUSAL : null
}
