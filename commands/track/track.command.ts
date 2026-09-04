import type { Command } from "../../command-system/commands/command.page-type.ts"

export const track = {
  id: "01a06818-339b-7fc2-8cd9-caea195150b2",
  pageTypeSlug: "command",
  slug: "track",
  definition: "the command acting on the sessions one of Alan's days is made of",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  partSlugs: ["module/session-leveling", "module/session-rows", "module/waking"],
  taking: [
    { said: "session", takes: "what to act on, which is one stretch of time a day was spent in" },
    { said: "open", takes: "the act, which is to begin a stretch where none is open" },
    { said: "switch", takes: "the act, which is to end the open stretch and begin the next" },
    { said: "close", takes: "the act, which is to end the open stretch and leave the day closed" },
    { said: "log", takes: "the act, which is to write a stretch that already began and ended" },
    { said: "amend", takes: "the act, which is to change a stretch already written" },
    { said: "drop", takes: "the act, which is to take a stretch away" },
    { said: "split", takes: "the act, which is to part one stretch into two at a time said" },
    { said: "show", takes: "the act, which is to say what a day holds, each stretch with its id" },
    { said: "file", takes: "the act, which is to take a whole day in as written lines" },
    { said: "check", takes: "the act, which is to judge a day's rows and change nothing" },
    { said: "--title <text>", takes: "what the stretch is called" },
    {
      said: "--at <time>",
      takes: "a wall time the act falls at, or one the stretch acted on covers",
    },
    { said: "--start <time>", takes: "the wall time a stretch began" },
    { said: "--end <time>", takes: "the wall time a stretch ended" },
    { said: "--day <date>", takes: "which day to act on, written as that day's own date" },
    {
      said: "--safety <level>",
      takes: "how safe Alan was over the stretch, from -2 to 5 in half steps",
    },
    {
      said: "--difficulty <level>",
      takes: "how hard the stretch was on him, from 0 to 5 in half steps",
    },
    {
      said: "--relationship <id|title>",
      takes: "who the stretch was with, said again or parted by commas for several",
    },
    { said: "--id <uuid>", takes: "the stretch to act on, named by the id that stretch carries" },
    { said: "--open", takes: "the stretch to act on, which is the one that is open" },
    { said: "--last", takes: "the stretch to act on, which is the one that ended last" },
    { said: "--leave-gap", takes: "leave the stretches on either side unmoved" },
    { said: "--mend", takes: "close the gap a dropped stretch leaves behind" },
    {
      said: "--from-file <path|->",
      takes: "the day's lines, read from a file or from standard input",
    },
    { said: "--json", takes: "answer as JSON rather than as lines meant for a reader" },
    { said: "--dry-run", takes: "judge what the act would land and write nothing" },
  ],
  helpNotes: [
    "the words are read in order, and one call names one act.",
    "every time said here is a US Mountain wall time, and no other clock is read or written.",
    "a day is named at --day and nowhere else.",
    "a stretch is addressed by --id, by --at, by --open or by --last, so no act asks for an id first.",
    "show prints each stretch's id in what it says to a reader, which is where an id to address by comes from.",
    "amend moves the stretches on either side to keep the day contiguous, and --leave-gap leaves them alone.",
    "drop leaves the gap it makes behind unless --mend is said.",
    "a sleep switch ends moves to the day it woke into, and the next stretch opens that day.",
    "--relationship names a relationship by its id or by its title, and amend replaces what a stretch carried rather than adding to it.",
    "a title carrying one of a relationship's aliases tags the stretch with that relationship, with no flag said, and what --relationship names is kept beside it.",
    "an alias more than one relationship carries tags neither, and says nothing about it, since no act that writes stops to ask.",
    "a line handed to file opens with a wall time, carries the title next, and closes with the safety and the difficulty run together.",
    "each line handed to file ends where the line after it begins, and the last line of the set is left open.",
    "the lines handed to file are judged as a set and refused as a set, and a set that is sound lands as one commit.",
    "check judges a day by what every act that writes is judged by, and it writes nothing itself.",
    "--dry-run is taken by every act that writes.",
    "a session is the only thing acted on here.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "What to act on is the first word and the act is the second.",
    },
    {
      invariantKind: "departure",
      statement: "A wall time this command takes or says is a US Mountain time.",
    },
    {
      invariantKind: "departure",
      statement: "The day a sleep woke into is named by the ESO reset at six in New York.",
    },
    {
      invariantKind: "departure",
      statement: "A day is named at `--day`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes `--date`.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch is addressed by the id that stretch carries.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch is addressed by a time that stretch covers.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch is addressed by being the open stretch.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch is addressed by being the stretch that ended last.",
    },
    {
      invariantKind: "absence",
      statement: "No act here needs an id to address a stretch.",
    },
    {
      invariantKind: "departure",
      statement: "What `show` says to a reader carries each stretch's own id.",
    },
    {
      invariantKind: "departure",
      statement: "`open` reads `--at` as the time the stretch begins.",
    },
    {
      invariantKind: "departure",
      statement: "`switch` reads `--at` as the time the open stretch ends and the next begins.",
    },
    {
      invariantKind: "departure",
      statement: "`close` reads `--at` as the time the stretch ends.",
    },
    {
      invariantKind: "departure",
      statement: "`split` reads `--at` as the time the stretch is parted at.",
    },
    {
      invariantKind: "departure",
      statement: "`amend` reads `--at` as a time the stretch amended covers.",
    },
    {
      invariantKind: "departure",
      statement: "`drop` reads `--at` as a time the stretch dropped covers.",
    },
    {
      invariantKind: "departure",
      statement: "A wall time whose hour is 1 to 12 is read on a twelve hour clock.",
    },
    {
      invariantKind: "departure",
      statement: "A wall time whose hour is 0 or 13 to 23 is read on a twenty-four hour clock.",
    },
    {
      invariantKind: "departure",
      statement: "A twelve hour reading is looked for from one hour after now back eleven hours.",
    },
    {
      invariantKind: "departure",
      statement:
        "A twenty-four hour reading is looked for from one hour after now back twenty-three hours.",
    },
    {
      invariantKind: "departure",
      statement: "The earliest instant a window reaches falls outside that window.",
    },
    {
      invariantKind: "departure",
      statement: "A bare wall time names one instant rather than two instants.",
    },
    {
      invariantKind: "departure",
      statement: "A wall time the clock skipped is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A wall time the clock struck twice is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A row is identified by a mark minted when the row is written.",
    },
    {
      invariantKind: "departure",
      statement: "A day carries one open stretch at most.",
    },
    {
      invariantKind: "departure",
      statement: "An amend moves the stretches on either side to keep a day contiguous.",
    },
    {
      invariantKind: "departure",
      statement: "`--leave-gap` leaves those stretches unmoved.",
    },
    {
      invariantKind: "departure",
      statement: "A drop leaves the gap behind.",
    },
    {
      invariantKind: "departure",
      statement: "`--mend` closes that gap.",
    },
    {
      invariantKind: "departure",
      statement: "An `open` begins a stretch where no stretch is open.",
    },
    {
      invariantKind: "departure",
      statement: "A `switch` ends the open stretch and begins the next at one time.",
    },
    {
      invariantKind: "departure",
      statement: "A `switch` finding no stretch open takes the open stretch of the day before.",
    },
    {
      invariantKind: "departure",
      statement: "The stretch a `switch` takes from the day before is a sleep.",
    },
    {
      invariantKind: "departure",
      statement: "A sleep a `switch` ends moves to the day that sleep woke into.",
    },
    {
      invariantKind: "departure",
      statement: "The stretch a `switch` begins opens the day that sleep woke into.",
    },
    {
      invariantKind: "departure",
      statement: "Two days one act changes land as one commit.",
    },
    {
      invariantKind: "absence",
      statement: "A `close` moves no sleep.",
    },
    {
      invariantKind: "departure",
      statement: "A `close` ends the open stretch.",
    },
    {
      invariantKind: "absence",
      statement: "A `close` begins no stretch.",
    },
    {
      invariantKind: "departure",
      statement: "A `log` writes a stretch whose start and end are both said.",
    },
    {
      invariantKind: "departure",
      statement: "A `split` parts one stretch into two stretches at the time said.",
    },
    {
      invariantKind: "departure",
      statement: "`--relationship` names a relationship by its id or by its title.",
    },
    {
      invariantKind: "departure",
      statement: "A title no relationship carries is refused rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "A title more than one relationship carries is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An `amend` replaces what a stretch carried rather than adding to the stretch.",
    },
    {
      invariantKind: "departure",
      statement: "Both halves a `split` makes carry the relationships of the stretch parted.",
    },
    {
      invariantKind: "departure",
      statement: "A title carrying a relationship's alias tags the stretch with that relationship.",
    },
    {
      invariantKind: "departure",
      statement: "A relationship a title tags is kept beside one `--relationship` names.",
    },
    {
      invariantKind: "departure",
      statement: "An alias more than one relationship carries tags neither and refuses nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An act that sets a title reads that title for aliases.",
    },
    {
      invariantKind: "departure",
      statement: "Every act that writes takes `--dry-run`.",
    },
    {
      invariantKind: "departure",
      statement: "A `--dry-run` judges what would land and writes nothing.",
    },
    {
      invariantKind: "absence",
      statement: "`show` and `check` write nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A line handed to `file` opens with a wall time.",
    },
    {
      invariantKind: "departure",
      statement: "The title of the stretch follows that time.",
    },
    {
      invariantKind: "departure",
      statement: "The line closes with `s<safety>d<difficulty>`.",
    },
    {
      invariantKind: "departure",
      statement: "A line ends where the next line begins.",
    },
    {
      invariantKind: "departure",
      statement: "The last line of a set is left open.",
    },
    {
      invariantKind: "departure",
      statement: "A set of lines is judged whole.",
    },
    {
      invariantKind: "departure",
      statement: "A set carrying one fault is refused whole.",
    },
    {
      invariantKind: "departure",
      statement: "A set that is judged sound lands as one commit.",
    },
    {
      invariantKind: "departure",
      statement: "`--from-file` names the file the lines are read from.",
    },
    {
      invariantKind: "departure",
      statement: "`--from-file` said as `-` reads the lines from standard input.",
    },
    {
      invariantKind: "departure",
      statement: "`check` refuses a line that is not JSON.",
    },
    {
      invariantKind: "departure",
      statement: "`check` refuses a key the row's own declaration does not carry.",
    },
    {
      invariantKind: "departure",
      statement: "`check` refuses a key spelled in kebab.",
    },
    {
      invariantKind: "departure",
      statement: "`check` refuses an id that is no uuid version 7.",
    },
    {
      invariantKind: "departure",
      statement: "`check` refuses an id two rows of a day carry.",
    },
    {
      invariantKind: "departure",
      statement: "`check` refuses a row naming a day no page carries.",
    },
    {
      invariantKind: "departure",
      statement: "`check` refuses a safety outside -2 to 5.",
    },
    {
      invariantKind: "departure",
      statement: "`check` refuses a difficulty outside 0 to 5.",
    },
    {
      invariantKind: "absence",
      statement: "`check` judges no gap between two stretches.",
    },
    {
      invariantKind: "absence",
      statement: "`check` judges no overlap between two stretches.",
    },
    {
      invariantKind: "absence",
      statement: "`check` says nothing beyond what `check` refuses.",
    },
    {
      invariantKind: "departure",
      statement: "`check` refuses a day carrying more than one open stretch.",
    },
    {
      invariantKind: "departure",
      statement: "`check` reads a whole day rather than stopping at the first fault.",
    },
    {
      invariantKind: "departure",
      statement: "Every act that writes is judged by what `check` judges.",
    },
    {
      invariantKind: "departure",
      statement: "No call names the kind of change landed here.",
    },
    {
      invariantKind: "departure",
      statement: "The kind named here runs no warrant.",
    },
    {
      invariantKind: "departure",
      statement: "No reading is owed for a row landed here.",
    },
    {
      invariantKind: "departure",
      statement: "Every check that judges a write judges what lands here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here breaks the glass.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here acts on anything but a session.",
    },
  ],
} as const satisfies Command
