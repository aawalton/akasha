import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const sophiaAgentStopHook = {
  id: "01a091af-b1f9-7864-84c4-4f36df8762d6",
  type: "initiative",
  slug: "sophia-agent-stop-hook",
  domain: "domain/hook",
  persona: "sophia",
  intents: [
    {
      statement: "No clean turn Alan has labelled draws a refusal from the live judge.",
      workingMemory:
        "Met for Neither Clock Nor Meter, the one directive the live hook judges: no refusal on any of the 214 turns the 413 cases label as breaking nothing, and 15 of 34 breaches caught. The 6 that read as misfires all sit on turns labelled against some other rule, and at least three break this rule as well, so the loss is the answer key rather than the judge. The second judge is measured and landed but not turned on, and turning it on makes the hook refuse more.",
    },
    {
      statement:
        "Each of the five directives Alan's page states has a judge that misfires on nothing.",
      workingMemory:
        "Two of five have judges, each one prompt. Neither Clock Nor Meter, at `directive-kept`, catches 15 of 34 and refuses none of 214 clean turns. One At A Time, at `one-at-a-time-kept`, catches 11 of 24 and refuses none of 214; over Eppie's whole pool, 19 of 33 and none of 227. What got it past its misfires was turns already judged put in to calibrate, and a terminal clause after the ordered steps. No Commentary was set down at 0.857. Don't Stop! has 55 breaches waiting and Act By Default 36.",
    },
    {
      statement:
        "A stop that never reached the model is told apart from a turn the model judged clean.",
      workingMemory:
        "116 Stop runs since the hook went live at 15:39 on 2026-09-11, and none refused, while the same judge run offline catches 14 of 34 breaches mined from that same day's logs. Nothing says which of the two numbers to believe, because nothing records whether a run reached the model. `judging` opens the gate on six paths that look alike from outside: no person, no directive, no tail, a subagent still working, a model unreachable, and a bare catch over the whole of it.",
    },
    {
      statement: "The code deciding whether to hold a turn open is tested.",
      workingMemory:
        "`judging` in `keep-alan-directives.inference-hook.code.ts` holds the whole decision and has no test. The test file beside it covers `personIn`, `stillWorking` and `SCOPE` and stops there. The hook's own page carries a gap nothing answers: a turn held open twice running says so to the person.",
    },
    {
      statement: "A case names every directive the turn breaks rather than one of them.",
      workingMemory:
        "`case-against` holds one rule, so `keeping` reads a turn labelled against another rule as a turn breaking nothing. 165 of the 413 cases are labelled that way, and the judge fires on 6 of them, three of which plainly break Neither Clock Nor Meter too. Every precision figure taken on this set is understated by that. The rival test says as much on its own page: which rule is named is not weighed, because one turn breaks more than one rule.",
    },
    {
      statement: "Every turn Eppie mined and labelled is a case.",
      workingMemory:
        "292 of her 449 trusted rows landed at `c628cb77f3d`, joining the 121 already there. The other 112 cannot land as things are: `check-reaches-a-path-through-the-index` judges the file the lines land in rather than the change carrying them, so `append-lines-from` gets the draft through and the apply still draws about 130 refusals. The check lets off a file held uncommitted, one a machine writes, and one a tool resolves the paths in, and a case file is none of the three. This waits on Alan's word.",
    },
  ],
  constraints: ["A refusal reminds an agent of a directive Alan's own page states."],
} as const satisfies Initiative
