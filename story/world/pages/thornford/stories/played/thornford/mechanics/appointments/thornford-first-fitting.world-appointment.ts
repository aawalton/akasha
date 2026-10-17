import type { WorldAppointment } from "akasha/story/world/mechanics/appointments/world-appointment.page-type.types.ts"

export const thornfordFirstFitting = {
  id: "01a14b9f-f8d1-732c-bdb6-e3eb270ea5fd",
  type: "page-type/world-appointment",
  slug: "thornford-first-fitting",
  title: "Shaestrel's first fitting with Nala",
  world: "world/thornford",
  characters: ["character-player/thornford-nala", "character-other/thornford-shaestrel"],
  appointmentAt: "2026-04-29T20:30:00.000Z",
  appointmentPlace: "Nala's shop on Weavers' Row, when the lamps are lit",
  createdAt: "2026-10-17T20:48:57.552Z",
  updatedAt: "2026-10-17T21:46:57.888Z",
} as const satisfies WorldAppointment
