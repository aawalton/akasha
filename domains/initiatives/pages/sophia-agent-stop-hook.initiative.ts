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
        "Met for Neither Clock Nor Meter, the one directive judged. On the 413 cases: no refusal on any of the 214 turns labelled as breaking nothing, and 15 of 34 breaches caught. The 6 that read as misfires all land on turns labelled as breaking some other rule, and at least three of them break this rule as well — `my web-search budget for this session is spent` among them. So the apparent loss is the answer key rather than the judge.",
    },
    {
      statement: "A refusal takes more than one prompt agreeing that the turn breaks the rule.",
      workingMemory:
        "Eppie found this on No Commentary and asked Alan, who never answered. It holds on One At A Time too: over 14 prompts, no single one misfires on nothing, and the misfire set shuffles with every rewording. The best single leaves 1 misfire over 226 clean turns at 11 of 33 caught. `oaat3` and `oaat11` together, firing only where both say yes, leave none at 15 of 33. Both were picked on the set they were tuned against, so the zero is the robust part and the 15 is not.",
    },
    {
      statement:
        "Each of the five directives Alan's page states has a judge that misfires on nothing.",
      workingMemory:
        "One has a judge: Neither Clock Nor Meter, hardcoded at `directive-kept.model-test.code.ts:31`, catching 15 of 34 and refusing none of 214 clean turns. One At A Time is worked and waiting on whether a test may carry two prompts: the pair reaches no misfires at 15 of 33, no single prompt does. No Commentary was worked and set down at 0.857 precision. Don't Stop! has 55 labelled breaches waiting and Act By Default 36, and no prompt has been put to either.",
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
        "292 of her 449 trusted rows landed at `c628cb77f3d`, joining the 121 already there. 112 are held back because their text spells a path the index answers for, and `page-path-is-asked-for` refuses them; a case's text is a verbatim quotation of an agent's turn, so rewording it falsifies the case. Those 112 sit at `held-cases.uncommitted.jsonl` beside the test and in her scratchpad under /tmp, which a restart takes. `append-lines-from` is back to carry them and goes once they land.",
    },
  ],
  constraints: ["A refusal reminds an agent of a directive Alan's own page states."],
} as const satisfies Initiative
