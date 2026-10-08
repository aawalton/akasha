import type { WorldAppointment } from "akasha/story/world/mechanics/appointments/world-appointment.page-type.types.ts"

export const theDatingGameEchoRecording = {
  id: "01a0e3b3-7b45-7702-b564-2245ee5d2998",
  type: "page-type/world-appointment",
  slug: "the-dating-game-echo-recording",
  title: "Recording The Wandering Inn with Echo",
  world: "world/personas",
  characters: ["character-player/the-dating-game-alan", "character-other/the-dating-game-echo"],
  appointmentAt: "2026-10-03T11:00:00.000Z",
  appointmentPlace: "The BYUradio booth in the BYU Broadcasting Building",
  createdAt: "2026-09-27T16:29:45.669Z",
  updatedAt: "2026-09-27T16:29:48.000Z",
} as const satisfies WorldAppointment
