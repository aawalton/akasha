import type { Command } from "akasha/command/command.page-type.types.ts"

export const fitnessNext = {
  id: "01a0b6f2-5cf1-7d7f-a0f4-5905b47e64a6",
  type: "page-type/command",
  slug: "fitness-next",
  definition: "the movement to do next at Alan's gym, with the load to take and what to beat",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  parts: ["module/marking", "module/stepping", "module/warming"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement Alan may not perform is gone before any movement is ranked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement the kit at Alan's gym cannot load is one Alan may not perform.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan's gym is the one `--gym` names, else the one today's latest set names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan is at home where neither `--gym` nor a set today names a gym.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a gym holds is read from the gym and kit pages rather than written here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At a gym holding every implement, every movement is loadable.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At a gym holding every implement, no weight is held at a ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A best Alan took near failure counts at every gym, wherever Alan took it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A best heavier than the kit at Alan's gym holds is offered at the heaviest load that kit holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capped weight climbs from the most reps Alan logged at that load.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capped weight Alan never logged holds the reps of his best.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capped weight is at the kit's ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run answering as JSON names the gym it weighed the movements against.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement naming no kit and a movement of the body alone are always loadable.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement is out where every muscle it trains is at its weekly ceiling.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A stretch and a bout of cardio are no movements to rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The weekday Alan is on names the focus the day trains.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement outside the day's focus is gone before any movement is ranked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day whose focus is rest is answered as rest rather than with a movement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day no schedule names leaves every movement in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The muscle owed the most against its weekly floor picks the movement from what the focus left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement is chosen from those training that muscle as a primary one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pattern least covered this week leads among the movements for that muscle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How Alan is today is read from the sets Alan has logged today.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first movement of a bout is one Alan has taken near failure before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement new to Alan is offered only once Alan has worked today.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bout takes no more movements new to Alan than the selection policy allows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement offered carries the weight to use and a number of reps to beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Short of a step up, the weight is the heaviest Alan took near failure, and the reps one past it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A movement the kit at Alan's gym cannot load further holds its weight and climbs its reps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A best whose reps reach the reps before slowing steps up a load where the gym has one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weight steps up one load, whatever reps that load leaves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reps at a weight stepped up are what the Epley relation gives from the best.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The Epley relation holds a best of w lb for r reps worth w × (1 + r/30) lb for one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weight stepped up carries at least 1 rep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weight stepped up is at no ceiling and is not slowed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A movement of the body alone never steps up a load.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement Alan never took near failure carries no weight and no reps.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "How long Alan was away is no reason to offer more or less.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every muscle being at its ceiling is answered as rest rather than refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Muscles owed alike are parted by the movement Alan has the deepest history with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement Alan may not perform is one a restriction names the pattern of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The kit keeping a movement out is tested on every run rather than on a day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A movement is dropped when that movement stops progressing rather than after a fixed time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A bout without progress is a day Alan took the movement near failure without beating its best.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A dropped movement is offered again once its pattern has progressed elsewhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A movement Alan turns down counts against that movement as much as a set counts for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement Alan turned down today is out for today.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A movement whose reps have run out as well as its kit holds both and is slowed instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every run ranks every movement again, so nothing is offered for having been offered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Stimulus against fatigue parts two movements the pattern and the history leave alike.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A warmup raises the temperature and mobilises the muscles.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No ramp set comes between the warmup and the working set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whether Alan is warm is read from the minutes since his last set rather than from the day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A warmup set is under the near-failure line, so the week's tally passes it over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run is handed the instant it runs at, and the day falls out of that instant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day an instant falls on is the tracked day Alan's sets name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run answers the one step Alan is on rather than the session that step opens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A day is bound by the pounds that day is to move rather than by Alan calling a halt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day that has moved its target is answered with a cool down and no more work.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cool down the target turns Alan to says what he moved and what was asked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every set counts toward the day, whether that set warmed Alan or worked him.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "What a muscle is owed this week picks the movement and is never said to Alan.",
    },
  ],
  name: "next",
  arguments: [{ argument: "argument/gym" }, { argument: "argument/json" }],
  updatedAt: "2026-10-08T15:11:01.194Z",
} as const satisfies Command
