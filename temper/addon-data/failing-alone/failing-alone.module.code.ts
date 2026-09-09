function said(reason: unknown): string {
  return reason instanceof Error ? reason.message : String(reason)
}

export function rendered(
  w: (dir: string, name: string, source: string) => Promise<number>,
  dir: string,
  name: string,
  render: () => string
): Promise<number> {
  return Promise.resolve()
    .then(() => w(dir, name, render()))
    .catch((reason: unknown) => {
      throw new Error(`\`${name}\` was not written: ${said(reason)}`)
    })
}

export function built<P, W>(
  name: string,
  build: (p: P, w: W) => readonly Promise<number>[],
  p: P,
  w: W
): readonly Promise<number>[] {
  try {
    return build(p, w)
  } catch (reason) {
    return [Promise.reject(new Error(`the \`${name}\` section wrote nothing: ${said(reason)}`))]
  }
}
