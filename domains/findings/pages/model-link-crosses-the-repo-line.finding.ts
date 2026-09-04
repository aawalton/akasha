import type { Finding } from "../finding.page-type.ts"

export const modelLinkCrossesTheRepoLine = {
  id: "01a06555-9f3e-7903-8c75-d798446897b0",
  pageTypeSlug: "finding",
  slug: "model-link-crosses-the-repo-line",
  domainSlug: "domain/all-about-alan",
  claim:
    "The note that grounds the automaticity framework points at its simulation by a relative path that resolves to nothing: `alan/books/all-about-alan/src/` does not exist in the books repo, and the script it names is tracked in the code repo instead.",
  evidence:
    "`notes/automaticity-systems.md:116` opens \"The model is in\" and then spends the path `../src/sl-simulation.py` twice — once as link text and once as the link target of a markdown link. It goes on to cite that script's output as the anchor for the acquisition rates, ceiling deltas and crossover trial the note rests on.\n\nFrom `notes/`, `../src/` resolves to `alan/books/all-about-alan/src/`. That directory is not in the books repo. `ls` on the corpus root reports only `experiments`, `journal`, `notes`, `OVERVIEW.md`, `personas` and `projects`; `git ls-files 'alan/books/all-about-alan/src/**'` returns zero; `git check-ignore -v alan/books/all-about-alan/src` exits 1, so no ignore rule is hiding it; and `rg -uuu --files ~/books` matches no path holding `sl-simulation`.\n\nThe script is real and sits across the repo line, tracked in the code repo at `packages/books/all-about-alan/src/sl-simulation.py`. Its own header closes \"Canonical home for the framework is notes/automaticity-systems.md\", so the two cite each other and each spells the other as a sibling directory. Only the note's end is broken, the note being the end that moved.\n\nThe link renders as a live citation and reads as one. Nothing in the books repo refuses a relative link leaving it, so the note carries a checkable-looking anchor to its own numerical evidence that no reader can follow.",
} as const satisfies Finding
