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
        "Eppie's last finding, and her question to Alan went unanswered. No single prompt reaches zero misfires, because the misfire set shuffles with every rewording: 0 of 8 single prompts, 5 of 28 pairs and 23 of 56 triples reach zero. `nc9` and `nc16` together caught 8 with no misfire over 380 clean turns. `model-test-running` joins prompts with `anyYes`, an or, so two prompts that disagree fire today. Making that an and changes what the hook refuses, so it is Alan's.",
    },
    {
      statement:
        "Each of the five directives Alan's page states has a judge that misfires on nothing.",
      workingMemory:
        "One has a judge: Neither Clock Nor Meter, hardcoded at `directive-kept.model-test.code.ts:31`. No Commentary was worked and set down at 0.75 precision and 0.13 recall. Don't Stop! has 63 labelled breaches waiting, Act By Default 38, One At A Time 34, and no prompt has been put to any of them. Alan takes one directive at a time, holds precision far above recall, and reads recall over the union of the judges rather than over any one.",
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
