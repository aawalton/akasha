export const PERSON_SLUG = "person"

export interface EnrolledPerson {
  readonly slug: string
  readonly personUserId: string
  readonly persona: string
  readonly handlerSeat: string
  readonly phone: string | null
  readonly email: string | null
}
