export const FROM = "--from"

export const TO = "--to"

export const REPO = "--repo"

export const MESSAGE = "--message"

export const MESSAGE_FILE = "--message-file"

export const INPUT_FILE = "--input-file"

export const DRY_RUN = "--dry-run"

export const DESCRIPTION =
  "PAIRS ARE THE SHAPE — `--from <old> --to <new>`, repeated. Two documents naming each other " +
  "cannot move one at a time in any order, and a restructure splitting one document into two " +
  "named paths is one act rather than two.\n" +
  "\n" +
  "WHAT IT REPOINTS is what a hand-run grep was reaching for. A markdown link is RESOLVED rather " +
  "than matched, so a relative spelling and an absolute one are both followed, and a link label " +
  "is rewritten where it is exactly the target's filename stem — an address written in words, " +
  "which goes stale in silence because the link still resolves. The `slug:` a moved page " +
  "declares follows its new FILENAME, and every frontmatter value naming that slug follows with " +
  "it, the key set read off the page types rather than listed. A relative `import`/`from` naming " +
  "a moved `.ts` is repointed in whatever repository the importer stands in, under its `.js`, " +
  "extensionless and `/index.ts` spellings. A path written as TEXT — a doc comment, a shell " +
  "example, a hook command, a string in a test — is rewritten inside a fence as readily as " +
  "outside one. A moved file's own relative links are re-anchored to the directory it lands in. " +
  "Every rewrite is printed with its line before anything lands.\n" +
  "\n" +
  "WHAT IT DOES NOT REPOINT is the `# Definition` term of a page whose name changed, and [slug] " +
  "names it. A key and a label state their subject with nothing else in the sentence turning on " +
  "the spelling; a term is authored prose that the definition beneath it is written around, and " +
  "a new name substituted into that lands a statement which is false rather than merely stale. " +
  "Change the term and its sentence together, or leave both.\n" +
  "\n" +
  "AN OCCURRENCE THAT SPELLS A MOVED PATH rather than writing it — a regex escaping its slashes " +
  "and dots, a JSON string escaping a slash — is named by [escaped] and REFUSES the move. " +
  "Re-emitting a path into a matcher's escaping means guessing which language and which of its " +
  "characters take a backslash, and a wrong guess reads correct and matches nothing. Write the " +
  "path whole and land that first, with the repo still green.\n" +
  "\n" +
  "A reference from `dirty/` is reported and never rewritten: quarantined material holds no veto " +
  "over the live documents, and neither does it earn an edit from a command.\n" +
  "\n" +
  "A PAGE'S OWN FILES GO WITH IT — an attachment, a rows file and its parts, an uncommitted file " +
  "or a sops file standing beside a moved page — carried to the path the page lands on without " +
  "being named, and refused where something already stands there.\n" +
  "\n" +
  "A FILE WHOSE KIND STATES `binary: true` IS CARRIED, its bytes landing at the new path exactly " +
  "as they left. The survey that rewrites a path written as text passes over it, having no text to " +
  "read, and `--input-file` may not name it. A file of any other kind holding a NUL byte is " +
  "REFUSED, that being a stray byte in a document rather than a kind this carries.\n" +
  "\n" +
  "ONE COMMIT INSIDE ONE REPOSITORY carries every body to its new path, every referrer it " +
  "repointed, and the removal of every path moved out of. A repo holding the body at both paths " +
  "at once is two documents declaring one `slug:`, which is not a state to publish.\n" +
  "\n" +
  "A MOVE BETWEEN REPOSITORIES IS ONE ACT AND TWO COMMITS, one in each. The destination takes " +
  "the bodies first, being the side with checks that can refuse, and the source gives up the " +
  "paths they left only after a landing that passed; nothing merges the two, so no failure loses " +
  "a body. The destination's gate is told what this same act takes out of the source, so a page " +
  "is not refused for carrying a name still standing at the path it is leaving. Every `--from` " +
  "names one repository and every `--to` names one.\n" +
  "\n" +
  "A THIRD REPOSITORY IS TOUCHED WHERE IT ONLY IMPORTS WHAT MOVED, neither giving a body up nor " +
  "taking one, and its repointed importers are committed there FIRST, ahead of both sides. " +
  "akasha refuses a change leaving an import elsewhere naming a path it no longer holds, and " +
  "reads that importer off DISK. A dry run writes nothing and hands the gate the bodies it would " +
  "have written, so what it reports is what a real run would land.\n" +
  "\n" +
  "EVERY LANDING IS GATED AS MECHANICAL. A move authors no body: the bytes that land are the " +
  "bytes that left, and any repointing or `--input-file` change is this command's own work " +
  "rather than anyone's writing. The checks asking what a writer read stand aside; the ones " +
  "measuring the tree the move would leave do not. Nothing asks you to have read what you are " +
  "moving, a move relocating a body rather than destroying it.\n" +
  "\n" +
  "`--input-file` CHANGES A BODY AS IT LANDS, and it is how a document becomes a document of " +
  "another kind: a page type is decided by the name a file carries, so a domain renamed onto " +
  "another page type's name is judged against that page type the moment it arrives, and without " +
  "this flag the only route is `rm` then `write`, with the slug resolving to nothing in between. It " +
  "takes the shape `edit` takes, `file_path` naming the DESTINATION, and each pair is applied " +
  "before any gate sees the body — AFTER the link re-anchoring, so an `old_string` spanning a " +
  "relative link must be written as the link will read at the new path."

export const FLAGS = [
  { name: REPO, argLabel: "<name>", valueShape: "token" as const, description: "Which repository the --from paths address. They settle it, and a disagreeing --repo is refused." },
  { name: FROM, argLabel: "<p>", valueShape: "token" as const, path: true, repeat: true, description: "A file to move, absolute or against the directory this ran in. Each --from takes its own --to." },
  { name: TO, argLabel: "<p>", valueShape: "token" as const, path: true, repeat: true, description: "Where it lands. Must not exist. May be in another repository, which makes the move one act and two commits." },
  { name: INPUT_FILE, argLabel: "<f>", valueShape: "token" as const, path: true, description: "Edits to apply as the bodies land, in the shape `edit` takes; `file_path` names the destination." },
  { name: MESSAGE, argLabel: "<s>", valueShape: "prose" as const, description: "Commit message. Defaults to one naming the pairs." },
  { name: MESSAGE_FILE, argLabel: "<f>", valueShape: "token" as const, path: true, description: "Read the commit message from a file." },
  { name: DRY_RUN, description: "Gate and report; write, commit and remove nothing." },
]

export const EXITS = [
  { code: 0, meaning: "gated, moved, repointed, removed and committed once in every repository the act touches, and the push handed off (or dry-run)" },
  { code: 1, meaning: "input error, or a gate refused — nothing was moved and nothing was removed" },
  { code: 3, meaning: "operational: a write, a removal or a commit failed" },
]
