import type { Domain } from "../../../domains/domain.page-type.ts"

export const codeEditor = {
  id: "01a0658a-e55d-7059-8f58-e3521a432370",
  pageTypeSlug: "domain",
  slug: "code-editor",
  definition: "a workbench of files, groups, panels and terminals",
  partSlugs: [
    "domain/code-editor-group-layout",
    "module/editor-page-sweeping",
    "page-type/code-editor-window",
    "page-type/code-editor-group",
    "page-type/code-editor-terminal",
    "repo/code-editor-repo",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The editor is a fork of openvscode-server never rebased onto openvscode-server.",
    },
    {
      invariantKind: "departure",
      statement: "The editor runs as a desktop application.",
    },
    {
      invariantKind: "departure",
      statement: "The editor is served to a browser only to run the editor's own checks.",
    },
    {
      invariantKind: "departure",
      statement: "A seat works in the `code-editor` checkout.",
    },
    {
      invariantKind: "departure",
      statement: "A candidate works in a worktree of the `code-editor` checkout.",
    },
    {
      invariantKind: "departure",
      statement: "Alan runs an artefact under `~/.local/share`.",
    },
    {
      invariantKind: "departure",
      statement: "Only the editor's own `tools/promote.sh` writes the artefact Alan runs.",
    },
    {
      invariantKind: "departure",
      statement: "A change to the fork reaches Alan only once the fork is promoted.",
    },
    {
      invariantKind: "departure",
      statement: "The artefact's `extensions/ops` is a symlink to `editor-extension` in akasha.",
    },
    {
      invariantKind: "departure",
      statement: "A change to the extension reaches Alan without being promoted.",
    },
    {
      invariantKind: "departure",
      statement: "A change reaches Alan's window only on a window reload.",
    },
    {
      invariantKind: "departure",
      statement: "A panel re-reads when the repository the panel shows is written.",
    },
    {
      invariantKind: "departure",
      statement: "A panel re-reads on a write rather than on a timer.",
    },
    {
      invariantKind: "departure",
      statement: "A read that failed leaves the last good rows on screen.",
    },
    {
      invariantKind: "departure",
      statement: "A panel counts every row of every kind the panel showed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A panel showing an agent's color follows that agent's turn state as the state changes.",
    },
    {
      invariantKind: "departure",
      statement: "A turn state is shown within 100ms of the file carrying the state being written.",
    },
    {
      invariantKind: "departure",
      statement: "A color is read through the command's own file rather than the `ops` dispatcher.",
    },
    {
      invariantKind: "departure",
      statement: "The work panel's roots are the initiatives under no other initiative.",
    },
    {
      invariantKind: "departure",
      statement: "The work panel's roots are ordered alphabetically by slug.",
    },
    {
      invariantKind: "departure",
      statement: "A row with a seat of its own takes that seat's color.",
    },
    {
      invariantKind: "departure",
      statement: "A row takes the highest color of the rows beneath the row.",
    },
    {
      invariantKind: "departure",
      statement: "Green outranks blue.",
    },
    {
      invariantKind: "departure",
      statement: "Blue outranks yellow.",
    },
    {
      invariantKind: "departure",
      statement: "Yellow outranks every other color.",
    },
    {
      invariantKind: "departure",
      statement: "A color the ranking does not name sits below every color the ranking names.",
    },
    {
      invariantKind: "departure",
      statement: "An act on a seat runs `ops` directly rather than through a shell.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal the seat menu opens does nothing but attach to a seat.",
    },
    {
      invariantKind: "departure",
      statement: "Changing where a seat runs leaves the agent in that seat untouched.",
    },
    {
      invariantKind: "departure",
      statement: "Running a seat interactively gives the seat a terminal Alan can watch.",
    },
    {
      invariantKind: "departure",
      statement: "Running a seat headless takes the seat's terminal away.",
    },
    {
      invariantKind: "departure",
      statement: "Stopping a seat ends the agent in the seat.",
    },
    {
      invariantKind: "departure",
      statement: "Resuming a seat returns a stopped seat on the session the seat was bound to.",
    },
    {
      invariantKind: "departure",
      statement: "Resetting a seat replaces the agent in the seat with a new agent.",
    },
    {
      invariantKind: "departure",
      statement: "Copying a seat name puts that name on the clipboard.",
    },
    {
      invariantKind: "gap",
      statement: "Alan works in the editor rather than in desktop VS Code.",
    },
    {
      invariantKind: "gap",
      statement: "Parts of the upstream fork Alan will never use have been removed.",
    },
    {
      invariantKind: "gap",
      statement: "Any agent can arrange the editor's tabs.",
    },
    {
      invariantKind: "gap",
      statement: "Any agent can arrange the editor's groups.",
    },
    {
      invariantKind: "gap",
      statement: "Any agent can arrange the editor's panels.",
    },
    {
      invariantKind: "gap",
      statement:
        "The editor's build resolves what the build needs inside the editor's own checkout.",
    },
    {
      invariantKind: "gap",
      statement: "No code repository sits beside the editor's build.",
    },
    {
      invariantKind: "gap",
      statement: "The editor is one clone.",
    },
    {
      invariantKind: "gap",
      statement: "Every row in the work panel is an initiative.",
    },
    {
      invariantKind: "gap",
      statement: "Every act the seat menu names is offered in the seat menu.",
    },
  ],
} as const satisfies Domain
