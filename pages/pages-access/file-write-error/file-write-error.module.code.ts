export class FileWriteError extends Error {
  readonly pageTypeSlug: string
  constructor(pageTypeSlug: string, message: string) {
    super(message)
    this.name = "FileWriteError"
    this.pageTypeSlug = pageTypeSlug
  }
}
