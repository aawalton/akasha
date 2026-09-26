import type { StoryDesign } from "akasha/story/world/designs/story-design.page-type.types.ts"

export const theVioletHour = {
  id: "01a0657d-bb8e-7ad0-a154-2f2d8a670bbf",
  type: "page-type/story-design",
  slug: "the-violet-hour",
  title: "The Violet Hour — story design",
  world: "world/personas",
  premise: "md",
  tone: "hushed, unhurried, twilight-low; safe; gently progressing; built to release, never grip",
  visualStyle:
    "violet dusk-water; a dim lamplit bedroom edge; still lake at twilight; soft diffuse light, deep calm purples and silver",
  narrator:
    "Ione, as the one steady voice throughout; others speak only as tagged quoted speech inside her telling.",
  readerFraming:
    "The listener is not in the room. Nothing is said to a you, and nothing points at Alan or at anyone listening.",
  structure:
    "One scene a night, about 1000 words, in plain prose paragraphs. Energy and pace fall gently to a settled, quiet close, never a hook, a question or an invitation.",
  continuity:
    "Natalie's Table is the founding scene. The Waystation by the Lake, spoken to the listener as you, is not canon.",
  writingPhilosophy:
    "Settle, don't grip. Window-pane prose: plain, clear sentences, sparse metaphor, and no line that calls attention to its own craft. Kind, low-key company; fond teasing, never an edge. No threat, suspense, conflict or stakes. No goal met or win tallied: people may mention their days, but sharing is the point. No System speaks. Every line is speakable aloud: contractions, plain words, no stage directions, and a wordless beat only as Mm. or Mm-hmm. Lower the register as it goes; the ending fades rather than lands. Content must survive being half-followed into sleep.",
} as const satisfies StoryDesign
