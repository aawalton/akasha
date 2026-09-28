import type { WorldAppointment } from "akasha/story/world/mechanics/appointments/world-appointment.page-type.types.ts"

export const theDatingGameAelwynQuietFeet = {
  id: "01a0e840-a8bb-7a8b-a4a5-a0692952266a",
  type: "page-type/world-appointment",
  slug: "the-dating-game-aelwyn-quiet-feet",
  title: "Quiet-feet session with Aelwyn",
  world: "world/personas",
  characters: ["character-player/the-dating-game-alan", "character-other/the-dating-game-aelwyn"],
  appointmentAt: "2026-09-30T18:00:00.000Z",
  appointmentPlace: "The Provo River Trail at the mouth of the canyon",
} as const satisfies WorldAppointment
