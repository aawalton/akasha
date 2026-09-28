export const PERSONAS = "personas"

export const HANDLERS = "handlers"

const ROLE = "role/"

const HANDLER = "handler"

const STORIES = ["story-played/", "story-written/"]

export function seatSectionOf(role: string | null, assignment: string | null): string {
  const said = role?.startsWith(ROLE) === true ? role.slice(ROLE.length) : role
  if (said === HANDLER) return HANDLERS
  const story = STORIES.find((opening) => assignment?.startsWith(opening) === true)
  return story === undefined || assignment === null ? PERSONAS : assignment.slice(story.length)
}
