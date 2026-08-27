export const isTestFilePath = (rel: string): boolean =>
  /\.test\.tsx?$/.test(rel) ||
  /(^|\/)_[^/]*-test-helpers\.tsx?$/.test(rel) ||
  /(^|\/)__fixtures__\//.test(rel)
