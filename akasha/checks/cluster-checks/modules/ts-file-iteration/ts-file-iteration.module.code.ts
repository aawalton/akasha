import { repoFilesAt } from "../../../../../tools/lib/repo-files-at.ts"

export interface TsFileWalkArgs {
  readonly repoRoot: string
  readonly treeSha: string | undefined
  readonly cacheDir: string | undefined
}

const DECLARATION_ENDING = ".d.ts"

const GENERATED_ENDINGS: readonly string[] = [".generated.ts", ".generated.tsx"]

const SOURCE_ENDINGS: readonly string[] = [".ts", ".tsx"]

const isTypeScriptSource = (rel: string): boolean => {
  if (!SOURCE_ENDINGS.some((ending) => rel.endsWith(ending))) return false
  if (rel.endsWith(DECLARATION_ENDING)) return false
  return !GENERATED_ENDINGS.some((ending) => rel.endsWith(ending))
}

export async function listTsFiles(args: TsFileWalkArgs): Promise<readonly string[]> {
  return repoFilesAt(args.repoRoot).filter(isTypeScriptSource)
}
