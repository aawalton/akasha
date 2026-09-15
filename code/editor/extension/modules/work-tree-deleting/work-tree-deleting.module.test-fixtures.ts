export type Said = {
  module: string
  exported: string
  args: readonly string[]
  timeout: number
}

export function callingWith(answer: string | Error, kept: Said[]) {
  return async (
    module: string,
    exported: string,
    args: readonly string[],
    options: { readonly timeout: number }
  ): Promise<string> => {
    kept.push({ module, exported, args, timeout: options.timeout })
    if (answer instanceof Error) throw answer
    return answer
  }
}
