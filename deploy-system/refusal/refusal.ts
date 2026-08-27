export class DeployRefused extends Error {
  constructor(message: string) {
    super(message)
    this.name = "DeployRefused"
  }
}
