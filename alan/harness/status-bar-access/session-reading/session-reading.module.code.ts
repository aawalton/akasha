import { selectHealthSamples } from "@akasha/health-samples-access/sample-selecting"
import { activeCaloriesFromSamples } from "akasha/alan/harness/health-samples-day/active-calories/active-calories.module.code.ts"
export interface WakeWindow {
  readonly from: number
  readonly to: number
}

export async function cardioReading(day: string, span: WakeWindow): Promise<number | null> {
  try {
    return activeCaloriesFromSamples(
      await selectHealthSamples({
        metric: "activeEnergy",
        from: new Date(span.from).toISOString(),
        to: new Date(span.to).toISOString(),
      })
    )
  } catch (cause) {
    throw new Error(
      `cardioReading: ${day}: ${cause instanceof Error ? cause.message : String(cause)}`
    )
  }
}
