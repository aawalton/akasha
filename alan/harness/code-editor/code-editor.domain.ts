import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const codeEditor = {
  id: "01a0658a-e55d-7059-8f58-e3521a432370",
  type: "domain",
  slug: "code-editor",
  definition: "a workbench of files, groups, panels and terminals",
  parts: [
    "domain/code-editor-group-layout",
    "page-type/code-editor-data-interface",
    "page-type/code-editor-group",
    "page-type/code-editor-terminal",
    "page-type/code-editor-window",
    "repo/code-editor-repo",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "More than a second of work on the extension host's thread locks the editor up.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Enough watch events arriving together ends the extension host.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A panel or a tab or the status line reads one file and works nothing out from the repository.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That file is written by one service rather than by the editor.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A panel or a tab or the status line re-reads when its own file is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file's cooldown lands the first change at once and collects the rest for its own wait.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The editor is a fork of openvscode-server never rebased onto openvscode-server.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The editor runs as a desktop application.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The editor is served to a browser only to run the editor's own checks.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat works in the `code-editor` checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A candidate works in a worktree of the `code-editor` checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Alan runs an artefact under `~/.local/share`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the editor's own `tools/promote.sh` writes the artefact Alan runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change to the fork reaches Alan only once the fork is promoted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The artefact's `extensions/ops` is a symlink to `editor-extension` in akasha.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change to the extension reaches Alan without being promoted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change reaches Alan's window only on a window reload.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A read that failed leaves the last good rows on screen.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A panel counts every row of every kind the panel showed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A panel showing an agent's color follows that agent's turn state as the state changes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A turn state is shown within 100ms of the file with the state being written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The work panel's top row holds the initiatives under no other initiative.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The initiatives under that top row are ordered alphabetically by slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row with a seat of its own takes that seat's color.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Green outranks blue.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Blue outranks yellow.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Yellow outranks every other color.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A color the ranking does not name sits below every color the ranking names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An act on a seat runs `ops` directly rather than through a shell.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A terminal the seat menu opens does nothing but attach to a seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Changing where a seat runs leaves the agent in that seat untouched.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Running a seat interactively gives the seat a terminal Alan can watch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Running a seat headless takes the seat's terminal away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Stopping a seat ends the agent in the seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Resuming a seat returns a stopped seat on the session the seat was bound to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Resetting a seat replaces the agent in the seat with a new agent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Copying a seat name puts that name on the clipboard.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Alan works in the editor rather than in desktop VS Code.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Parts of the upstream fork Alan will never use have been removed.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Any agent can arrange the editor's tabs.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Any agent can arrange the editor's groups.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Any agent can arrange the editor's panels.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "The editor's build resolves the dependencies the build needs inside the editor's own checkout.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "No code repository sits beside the editor's build.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The editor is one clone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A row in the work panel is the top row, an initiative, or an intent that initiative has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An initiative's intents are drawn beneath that initiative.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An intent is drawn in the place its initiative states rather than sorted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An intent opens the page of the initiative with that intent.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Every act the seat menu names is offered in the seat menu.",
    },
  ],
} as const satisfies Domain
