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
        "Measured on the 121 cases: 14 of 34 breaches caught, 2 misfires on 87 clean, so 87.5 percent precision against Alan's bar of no misfires at all. Both misfires quote a measured machine cost, which the prompt already carves out: a 120-second `change apply` ceiling, and a check loading 457 values. 88 of the 121 cases landed after the last prompt edit, so the prompt had never been scored on this set until now.",
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
  ],
  constraints: ["A refusal reminds an agent of a directive Alan's own page states."],
} as const satisfies Initiative
