export const PERSONAS = "personas"

export const HANDLERS = "handlers"

const ROLE = "role/"

const HANDLER = "handler"

const GAME = "story-played/"

export function seatSectionOf(role: string | null, assignment: string | null): string {
  const said = role?.startsWith(ROLE) === true ? role.slice(ROLE.length) : role
  if (said === HANDLER) return HANDLERS
  return assignment?.startsWith(GAME) === true ? assignment.slice(GAME.length) : PERSONAS
}
