export interface TransportRepo {
  readonly name: string
  readonly bareRepoPath: string
  readonly mirrorUrl: string | null
}

export const TRANSPORT_REPOS: readonly TransportRepo[] = [
  {
    name: "code",
    bareRepoPath: "/data/git/repositories/alan/code.git",
    mirrorUrl: "https://github.com/aawalton/code.git",
  },
  {
    name: "instructions",
    bareRepoPath: "/data/git/repositories/alan/instructions.git",
    mirrorUrl: "https://github.com/aawalton/instructions.git",
  },
  {
    name: "books",
    bareRepoPath: "/data/git/repositories/alan/books.git",
    mirrorUrl: "https://github.com/aawalton/books.git",
  },
  {
    name: "memory",
    bareRepoPath: "/data/git/repositories/alan/memory.git",
    mirrorUrl: "https://github.com/aawalton/memory.git",
  },
  {
    name: "stories",
    bareRepoPath: "/data/git/repositories/alan/stories.git",
    mirrorUrl: "https://github.com/aawalton/stories.git",
  },
  {
    name: "code-editor",
    bareRepoPath: "/data/git/repositories/alan/code-editor.git",
    mirrorUrl: "https://github.com/aawalton/code-editor.git",
  },
  {
    name: "akasha",
    bareRepoPath: "/data/git/repositories/alan/akasha.git",
    mirrorUrl: "https://github.com/aawalton/akasha.git",
  },
]

export function transportRepo(name: string): TransportRepo {
  const found = TRANSPORT_REPOS.find((r) => r.name === name)
  if (found === undefined) throw new Error(`no transport repo named ${name}`)
  return found
}
