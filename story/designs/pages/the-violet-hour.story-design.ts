import type { StoryDesign } from "../story-design.page-type.ts"

export const theVioletHour = {
  id: "01a0657d-bb8e-7ad0-a154-2f2d8a670bbf",
  pageTypeSlug: "story-design",
  slug: "the-violet-hour",
  title: "The Violet Hour — story design",
  worldSlug: "personas",
  premise:
    "The hour the water goes violet. Stories and tellings built to drift — enough pull to hold attention off the day's churn, loose enough to let go as sleep takes him.",
  tone: "hushed, unhurried, twilight-low; safe; gently progressing; built to release, never grip",
  visualStyle:
    "violet dusk-water; a dim lamplit bedroom edge; still lake at twilight; soft diffuse light, deep calm purples and silver",
  narrator: "ione",
  writingPhilosophy:
    "Settle, don't grip. Lower the register as it goes: sentences shorten, stakes stay near zero, progress arrives as small safe accumulating wins, the ending fades rather than lands. Content must survive being half-followed into sleep.",
} as const satisfies StoryDesign
