import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const buildingASettingICanBeSafeIn = {
  id: "01a06559-9d65-79b0-9dd9-896a4ac6b4a0",
  type: "page-type/all-about-alan-topic",
  slug: "building-a-setting-i-can-be-safe-in",
  title: "Building A Setting I Can Be Safe In",
  definition:
    "arranging a situation so little can go wrong in it, rather than raising what I can take",
  parents: ["all-about-alan-topic/how-safety-climbs"],
  related: [
    "all-about-alan-topic/practising-closeness-somewhere-safe",
    "all-about-alan-topic/who-is-safe-to-be-around",
  ],
  settled:
    "One is worked: the rig where I practise being close in text, with partners who stay stable.",
} as const satisfies AllAboutAlanTopic
