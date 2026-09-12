import { runPersonaPointsRebuilding } from "akasha/alan/harness/modules/persona-points-rebuilding/persona-points-rebuilding.module.code.ts"

export function runService(done: string[] = []): undefined {
  runPersonaPointsRebuilding(done)
}
