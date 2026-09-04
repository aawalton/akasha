import type { Finding } from "../finding.page-type.ts"

export const proseCorruptionSurvivesEveryCheckThatIsNotTheBytes = {
  id: "01a065c4-8f21-7000-b3d4-2c9a7e50d118",
  pageTypeSlug: "finding",
  slug: "prose-corruption-survives-every-check-that-is-not-the-bytes",
  domainSlug: "page-type/finding",
  claim:
    "One landed chapter had seven U+2714 HEAVY CHECK MARKs turned into U+221A SQUARE ROOTs. Both characters are three bytes, so the file was exactly the length it should have been, and no check short of comparing the bytes could have found it.",
  evidence:
    "Found by comparing all 449 book chapters landed under akasha/alan/library/reading/book-chapters/pages against their markdown in the read-only backup at /var/home/walton/repos/akasha-backup-2026-09-02, byte for byte. 448 were identical. The one that was not is all-about-alan/experiments/exp4-voice-reward-dose/dry-run-evidence, restored at 17ef9f7d36 and now identical too. " +
    'The instance matters less than what it says about the instrument. A length check passes it. A key-presence check passes it, because the page states `chapterText: "md"` and the file is there. A field-by-field check on the page passes it, because the corruption is not in a field. Only the bytes of the prose find it. Where prose lands as a file property, prove the prose and not the key. ' +
    "It was also the one chapter of 449 whose markdown had not been removed, which is the second thing worth keeping: the ablation check that refused to remove it was right, and the lane died before anyone read why. A held-back file is a report, not a nuisance to be cleared. " +
    "Three files in akasha hold a square root. The other two hold a real one — a topic page on waves matching its source exactly, and a book record — so this was not a sweep to be run with a substitution. " +
    "Scope beyond this family is unmeasured. A lane reported 329 of 329 prose twins identical, and this is a different 449, so the two together say 778 checked and one bad. Every family that carried prose into a file property is owed the same comparison against the backup before its markdown goes, and the comparison has to pair each source with the twin it actually landed as: a chapter opening with a digit takes its page type first, and a chapter sharing a name takes the folders telling it apart, so a naive path derivation reported 87 files missing that were all present under other names.",
} as const satisfies Finding
