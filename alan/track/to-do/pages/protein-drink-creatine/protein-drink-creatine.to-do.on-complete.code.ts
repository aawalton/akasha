import { rootOf } from "akasha/alan/track/daily/modules/akasha-day/akasha-day.module.code.ts"
import type { Completion } from "akasha/alan/track/to-do/modules/on-complete-running/on-complete-running.module.code.ts"
import { OK } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  foodLoggedAt,
  type Logged,
} from "akasha/command/pages/track/food/track-food.command.code.ts"

const CALLED_AS = "akasha track food"

const PROTEIN_DRINK: Logged = {
  title: "Protein drink + creatine",
  image: undefined,
  plantGrams: undefined,
  estimatedCalories: 150,
  date: undefined,
  time: undefined,
  json: false,
}

type Filing = (read: Logged, given: Given, at: Date) => Promise<Answer>

export async function onComplete(
  completion: Completion,
  filing: Filing = foodLoggedAt
): Promise<Answer> {
  const root = rootOf()
  const given: Given = { root, calledAs: CALLED_AS, from: root, writer: null, agentId: null }
  const said = await filing(PROTEIN_DRINK, given, completion.completedAt)
  if (said.code !== OK) throw new Error(said.refusals.join("\n"))
  return said
}
