export const CI_ENROLLMENT_KEY = "alanwalton.com/ci-enrollment" as const

export function ciEnrollmentCandidateLabel(): {
  readonly "alanwalton.com/ci-enrollment": "candidate"
} {
  return { [CI_ENROLLMENT_KEY]: "candidate" } as const
}
