import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const keepingMyOwnVolumeDown = {
  id: "01a06559-9d65-7c52-8d68-f4f91e8a5993",
  pageTypeSlug: "all-about-alan-topic",
  slug: "keeping-my-own-volume-down",
  title: "Keeping My Own Volume Down",
  definition: "showing little on the outside so the room does not send it back louder",
  parentSlugs: ["what-calms-me-down"],
  relatedSlugs: ["how-i-keep-sound-down", "how-much-company-i-can-take"],
  settled:
    "It is deliberate, not a flat feeling underneath.\n\nLoud from me makes people louder back, and their louder comes at me again. Quiet keeps the loop quiet.\n\nIt works a step earlier than earplugs or dark glasses, which cap what the room has already made.\n\nI often cannot tell from inside that the loop is winding up, so staying quiet by default is cheaper than catching it after.",
  unsettled:
    "Where it backfires is unmapped. In some rooms quiet gets read as nothing there at all, and family and work are the likely places.\n\nWhether it is the same thing as masking, and falls apart with it under load, is unprobed.\n\nWhich channels it covers, of volume, face, gesture, pace and wording, and which run untouched, is unlisted.",
} as const satisfies AllAboutAlanTopic
