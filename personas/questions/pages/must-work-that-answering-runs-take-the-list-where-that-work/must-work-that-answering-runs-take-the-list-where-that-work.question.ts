import type { Question } from "akasha/personas/questions/question.page-type.types.ts"

export const mustWorkThatAnsweringRunsTakeTheListWhereThatWork = {
  id: "01a095e0-01b2-7000-bb01-30ab110aa770",
  type: "question",
  slug: "must-work-that-answering-runs-take-the-list-where-that-work",
  ask: "Must work that `answering` runs take the list where that work does nothing before it throws?\n\n`answering` hands its work a list, and where the work throws it puts what that list holds into the refusal. Work declared taking no parameter never reaches the list, so its refusal is byte-identical to the refusal of a command that did nothing at all.\n\nA code check refusing that shape landed `experimental` tonight. It refuses 16 places. 3 were real faults and all 3 are now mended: `inference status`, `inference capability-list` and `mobile testflight-status` each gathered work into an array `answering` could not see. 11 are commands that read one thing and answer it — nine email and imessage `list` and `show` commands, plus `inference active-list` and `mobile sim status`. None writes, none mutates, none has anything to record before it throws, so the bare refusal each gives is accurate. 2 are `command-answering`'s own tests, which take no parameter deliberately, that being the branch under test.\n\nIf every lambda takes the parameter as a matter of form, all 16 become real, the 13 unmended are a straightforward sweep, and the check comes off `experimental` on a rule needing no judgement. The cost is that the parameter stops meaning anything: it sits in signatures where nothing is ever put into it.\n\nIf only work with something to record must take it, the parameter keeps its meaning — where it appears, something is gathered. The cost is that the check cannot make that judgement from the syntax. It would either stay `experimental` for good, or carry a list of the places excused, which the code-check page type's Derived Reach directive says not to do.",
  askedBy: "athena",
  askedIn: "01a09264-7109-79f3-9a3d-dd638b13652a",
  status: "open",
  offered: [
    "Every lambda takes the list, whether or not that lambda has anything to put in it",
    "Only work that records something takes the list, and the check stays experimental",
    "Only work that records something takes the list, and the check carries the exceptions",
    "Something else — I will say what",
  ],
} as const satisfies Question
