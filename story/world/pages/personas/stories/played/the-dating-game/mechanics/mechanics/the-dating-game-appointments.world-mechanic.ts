import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const theDatingGameAppointments = {
  id: "01a0e3b3-25d2-7fff-88b4-a1093aaf88c0",
  type: "page-type/world-mechanic",
  slug: "the-dating-game-appointments",
  title: "Appointments",
  description:
    'The Dating Game keeps the appointments made in play. When a turn\'s prose settles a plan to meet on a set day or at a set time, such as "next Saturday" or "tomorrow at 7", the mechanics story recorder, never the game master, files a world-appointment at `story/world/pages/personas/stories/played/the-dating-game/mechanics/appointments/the-dating-game-<short-name>.world-appointment.ts`, in `world/personas`. It states a short plain title saying what the appointment is and who it is with, such as "Hike to Kyhv Peak with Echo"; `characters`, naming `character-player/the-dating-game-alan` and each girl it is with; `appointmentPlace` where the prose names or plainly implies one; and `appointmentAt`, the exact in-game time the plan resolves to from that turn\'s end time on the-dating-game-time\'s clock, written the same way. "Next Saturday" said on a Saturday is seven days on. Where the plan names a day and no hour, the hour is the one the plan makes likeliest: a hike in the morning, dinner in the evening. When a later turn moves an appointment, the recorder changes its page; when a turn calls it off, the recorder removes its page. A kept appointment stays filed. Before each turn, the game master and the writer read every appointment page in that folder, so a plan made earlier is remembered, kept or missed on its day and hour, and the girl expects Alan when it comes. An appointment is no secret and no closeness level, so a character may say it and the prose may show it.',
} as const satisfies WorldMechanic
