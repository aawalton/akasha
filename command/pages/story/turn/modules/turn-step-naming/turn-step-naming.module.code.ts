import type { FlowPart } from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.code.ts"

export const LORE_STEP = "lore"

export const BEATS_STEP = "beats"

export const PROSE_STEP = "prose"

const PART_STEP: Readonly<Record<FlowPart, string>> = {
  event: "restate",
  changes: "numbers",
  prose: PROSE_STEP,
  memory: "memory",
  pictured: "pictures",
}

export function partStep(part: FlowPart): string {
  return PART_STEP[part]
}

const REVIEW = "review"

const RECORD = "record"

const SPACE = " "

export function reviewStep(reviewer: string): string {
  return `${REVIEW}${SPACE}${reviewer}`
}

export function recordStep(recorder: string): string {
  return `${RECORD}${SPACE}${recorder}`
}

const DOING: Readonly<Record<string, string>> = {
  [LORE_STEP]: `gathering the ${LORE_STEP}`,
  [BEATS_STEP]: `planning the ${BEATS_STEP}`,
  [PART_STEP.event]: "restating the event",
  [PART_STEP.changes]: `checking the ${PART_STEP.changes}`,
  [PROSE_STEP]: `writing the ${PROSE_STEP}`,
  [PART_STEP.memory]: `recording the ${PART_STEP.memory}`,
  [PART_STEP.pictured]: `choosing the ${PART_STEP.pictured}`,
}

function namedDoing(step: string): string {
  const said = DOING[step]
  if (said !== undefined) return said
  const [head = "", ...rest] = step.split(SPACE)
  const named = rest.join(SPACE).replaceAll("-", SPACE)
  if (head === REVIEW) return `reviewing ${named}`
  if (head === RECORD) return `recording ${named}`
  return `working on ${step}`
}

export function stepDoing(step: string, beat: number | null): string {
  const doing = namedDoing(step)
  return beat === null ? doing : `${doing} for beat ${beat}`
}
