import type { Characters } from "akasha/story/world/characters/properties/characters.multi-relation-property.types.ts"
import type { AppointmentAt } from "akasha/story/world/mechanics/appointments/properties/appointment-at.instant-property.types.ts"
import type { AppointmentPlace } from "akasha/story/world/mechanics/appointments/properties/appointment-place.text-property.types.ts"
import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export type WorldAppointment = WorldMechanic & {
  characters: Characters
  appointmentAt: AppointmentAt
  appointmentPlace?: AppointmentPlace
}
