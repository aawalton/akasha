import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkMeasuring = {
  id: "01a0735c-1733-7951-92bb-c79e18a063a2",
  type: "page-type/module",
  slug: "check-measuring",
  definition: "what a check's runs took",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A check's runs are read from the logs of one group beside that check's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A log row belongs to the group its file names whatever phase that row spells.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The entries beside that page are read as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The entries hold the history up to today.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entries row names no group.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The phase that row spells places the row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entries row spelling audit is the audit group's and every other row is not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That placing is the best the entries admit rather than the placing the writer meant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row the logs already hold is not counted again from the entries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two rows are one row where the two texts are the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every numbered file of the logs and the entries is read rather than the first alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The numbered files of one check are read in order from the first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A numbered file that is not there is no file left unread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row stating no elapsed time records no run, and is read as no record at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a row is a verdict an audit reached without running the check.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record's run is the run id that record has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record with no run id belongs to no run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller naming no choice reads the past twenty-four hours.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A record here is swept twenty-four hours after it ran, and a longer window reads no more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count says how many runs are read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The runs a count reads are the newest runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Runs are ranked by the latest moment any record of that run has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record belonging to no run is counted nowhere where runs were counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller naming a period reads every record stamped within that period.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A period ends at the moment of asking.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record with no run id is counted where a period was named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record stamped exactly a period's length ago is counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record stamped before a period opened is not counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record stamped after the moment of asking is not counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record whose time cannot be read is not counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A period is named in minutes or in hours or in days.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count of no runs is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word this module reads as neither a count nor a period is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the forms a choice is written in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The check group is read where the caller hands over no group.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The group a caller hands over is read in its place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run of the group that was not read counts nowhere in the table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run's processor time is that run's own together with the children that run reaped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run's memory is the bytes that run added over the memory resident when that run opened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that forgot no high-water mark is left out of the memory said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That run is counted in a processor average all the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That run is counted among the runs a check has all the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An audit run judges every page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An average is the total the runs took shared out over the count of those runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The count of runs a check holds is said beside that check's averages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The total counts the distinct runs read rather than the records read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The total shares the processor time over the distinct runs read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A peak of memory is added to no other peak.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The total draws its average memory as absent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count of bytes is rounded to the whole byte before that count is scaled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Checks are ordered by falling average processor time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Checks taking equal processor time are ordered by name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that could not be read is named beneath the table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row that would not read is passed over and the rest of that file is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file holding a row that would not read is named beneath the table as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file named for a torn row is no file left unread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check with no run the choice reached is not answered.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each measure is said as an average and as the most any one run took.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run's elapsed time is read from the milliseconds that run's row states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The total shares the elapsed time over the distinct runs read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The largest peak the total says is the largest peak any one record reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The most time the total says is what one whole run took rather than what one record took.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The averages are drawn together and the maximums after them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check's ceilings are drawn beside what that check's runs took.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ceilings drawn are the ones the group being read states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A measure no ceiling is stated for is drawn blank rather than absent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ceiling of memory is stated in megabytes and drawn as bytes.",
    },
    { decisionKind: "decision-kind/departure", statement: "The total draws no ceiling." },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A middle is what the run in the middle took, the runs ranked by the measure said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A middle over an even count of runs is halfway between the two runs at the middle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each measure is said as a middle beside its average.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The middles are drawn after the averages and before the maximums.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ceiling is set from the middle rather than from the average.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An average far from its middle says those runs are not one population.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The total's middle is the middle of what the whole runs took.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The total draws its middle memory as absent.",
    },
  ],
} as const satisfies Module
