import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const codeProcess = {
  id: "01a05c4f-6f2b-7cf2-8361-788954595f9a",
  type: "page-type/domain",
  slug: "code-process",
  definition: "a run of a program on a machine",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "process" },
    { partOfSpeech: "part-of-speech/noun", spelling: "processes" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A process is what the kernel names by a pid rather than a procedure or a series of steps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A process is read from outside it and ended from outside it here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A process this one starts is spawning, a sibling domain.",
    },
  ],
  parts: [
    "module/libc-mapping",
    "module/pid-signal",
    "module/port-holding",
    "module/proc-environ",
    "module/proc-reading",
    "module/process-ending",
  ],
} as const satisfies Domain
