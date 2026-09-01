import type { Finding } from "../finding.page-type.ts"

export const oneOfTheSixEscapingReachesInTheEditorExtensionIsDead = {
  id: "01a05caa-cacc-7d7a-a58b-330275a41533",
  pageTypeSlug: "finding",
  slug: "one-of-the-six-escaping-reaches-in-the-editor-extension-is-dead",
  domainSlug: "domain/editor-extension",
  claim:
    "Five of the six escaping reaches in `editor-extension/src/features/status-bar/activate.ts` resolve. `during-call/` and `readouts/` both stand at the repository root, so `../../../../during-call/during-call.ts` and the four `../../../../readouts/*.ts` all reach a tracked file. Only `../../../../day/day.ts` stands at nothing. The finding at `dc24a8cf40` said all six dangle and that the root holds no `during-call/` and no `readouts/` folder, and this replaces it.",
  evidence:
    "Measured by resolving each escaping specifier in the four editor-extension files that leave the folder against the importing file's own directory, trying the path itself and then `.ts`, `.tsx` and `index.ts` beneath it, and asking the filesystem whether each candidate is a file.\n\nThirteen escaping specifiers stand in those four files. Twelve resolve to a tracked file. One does not, and it is `../../../../day/day.ts`.\n\n`readouts/` holds 136 tracked files, 16 of them TypeScript, and it has been the workspace package named `readouts` since `70ac35dc37`. `during-call/during-call.ts` is one of the 26 paths `shared/status-bar-access/tsconfig.json` listed by hand until that same commit. Both stood before tonight and neither moved.\n\nWhat the earlier finding got right stands. The extension is a workspace the root `tsconfig.json` names no reference to, so the whole-tree build never reads the folder, and `../../../../day/day.ts` was dead before this migration touched anything.\n\nThe call taken in Alan's absence: replace the earlier finding rather than leave two that disagree, and keep its ruling to leave the extension alone. A reader acting on the old one would repoint five imports that already reach what they name.",
} as const satisfies Finding
