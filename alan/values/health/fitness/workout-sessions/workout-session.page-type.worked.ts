import type { SessionVolume } from "./properties/session-volume.computed-property.ts"
import type { WorkoutSession } from "./workout-session.page-type.ts"

export type WorkedWorkoutSession = WorkoutSession & {
  sessionVolume?: SessionVolume
}
